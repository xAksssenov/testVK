import { useState, useEffect, useCallback } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import { Box, Typography } from "@mui/material";
import type { Record, TableProps } from "../../types";
import axios from "axios";

const fieldsConfig = [
  { name: "name", label: "Имя" },
  { name: "email", label: "Почта" },
  { name: "age", label: "Возраст" },
  { name: "profession", label: "Профессия" },
  { name: "wages", label: "Заработная плата" },
];

const PAGE_SIZE = 10;

export default function RecordsTable({ refreshTrigger = 0 }: TableProps) {
  const [items, setItems] = useState<Record[]>([]);
  const [nextOffset, setNextOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/users?_start=${nextOffset}&_limit=${PAGE_SIZE}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      setItems((prev) => [...prev, ...data]);
      setNextOffset((prev) => prev + PAGE_SIZE);
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [nextOffset, loading, hasMore]);

  const resetAndReload = useCallback(() => {
    setItems([]);
    setNextOffset(0);
    setHasMore(true);
  }, []);

  useEffect(() => {
    resetAndReload();
  }, [refreshTrigger]);

  useEffect(() => {
    if (nextOffset === 0) {
      loadMore();
    }
  }, [nextOffset]);

  const itemCount = hasMore ? items.length + 1 : items.length;
  const isItemLoaded = (index: number) => !hasMore || index < items.length;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    if (!isItemLoaded(index)) {
      return (
        <Box
          sx={{
            ...style,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          }}
        >
          <Typography>Загрузка...</Typography>
        </Box>
      );
    }

    const item = items[index];
    return (
      <Box
        sx={{
          ...style,
          display: "flex",
          padding: "8px 16px",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: index % 2 === 0 ? "#fff" : "rgba(0, 0, 0, 0.02)",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {fieldsConfig.map((field) => (
          <Box
            key={field.name}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              px: 1,
              "&:first-of-type": {
                pl: 2,
              },
              "&:last-child": {
                pr: 2,
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {field.name === "wages"
                ? `${item.wages.toLocaleString()} ₽`
                : field.name === "name"
                ? item.name
                : field.name === "email"
                ? item.email
                : field.name === "age"
                ? item.age
                : field.name === "profession"
                ? item.profession
                : ""}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  if (error)
    return (
      <Box sx={{ p: 2, color: "error.main" }}>
        <Typography>Ошибка: {error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        "& .ReactVirtualized__Grid": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: "#fafafa",
        }}
      >
        {fieldsConfig.map((field) => (
          <Box
            key={field.name}
            sx={{
              flex: 1,
              px: 1,
              "&:first-of-type": {
                pl: 2,
              },
              "&:last-child": {
                pr: 2,
              },
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {field.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={500}
            itemCount={itemCount}
            itemSize={48}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width="100%"
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </Box>
  );
}
