"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Kudo, KudosFeedFilters } from "@/types/kudos";

interface KudosFeedReturn {
  kudos: Kudo[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

export function useKudosFeed(filters: KudosFeedFilters): KudosFeedReturn {
  const [kudos, setKudos] = useState<Kudo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(async (pageNum: number, append: boolean) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    // Abort previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: "10",
      });
      if (filters.hashtag) params.set("hashtag", filters.hashtag);
      if (filters.department) params.set("department", filters.department);
      if (filters.category) params.set("category", filters.category);

      const response = await fetch(`/api/kudos?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch kudos");
      }

      const data = await response.json() as {
        data: Kudo[];
        has_more: boolean;
      };

      if (append) {
        setKudos((prev) => [...prev, ...data.data]);
      } else {
        setKudos(data.data);
      }
      setHasMore(data.has_more);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [filters.hashtag, filters.department, filters.category]);

  // Reset on filter change
  useEffect(() => {
    setPage(1);
    setKudos([]);
    setHasMore(true);
    fetchPage(1, false);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage, true);
  }, [page, isLoadingMore, hasMore, fetchPage]);

  const retry = useCallback(() => {
    fetchPage(page, page > 1);
  }, [page, fetchPage]);

  return { kudos, isLoading, isLoadingMore, error, hasMore, loadMore, retry };
}
