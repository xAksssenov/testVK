import { useState, useEffect, useCallback } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import { Box, Typography, CircularProgress } from "@mui/material";
import type { Record, TableProps } from "../../types";
import axios from "axios";
import { tableStyles } from "./styles";

const fieldsConfig = [
  { name: "name", label: "Имя" },
  { name: "email", label: "Почта" },
  { name: "age", label: "Возраст" },
  { name: "profession", label: "Профессия" },
  { name: "wages", label: "Заработная плата" },
];

const PAGE_SIZE = 10;

export const RecordsTable: React.FC<TableProps> = ({ refreshTrigger }) => {
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
        <Box style={style} sx={tableStyles.loadingRow} role="row">
          <Box sx={tableStyles.cell} role="cell">
            <Typography>Загрузка...</Typography>
          </Box>
        </Box>
      );
    }

    const item = items[index];
    return (
      <Box style={style} sx={tableStyles.row} role="row">
        {fieldsConfig.map((field) => (
          <Box key={field.name} sx={tableStyles.cell} role="cell">
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

  if (loading && items.length === 0) {
    return (
      <Box sx={tableStyles.container}>
        <Box sx={tableStyles.loadingContainer}>
          <CircularProgress role="progressbar" />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={tableStyles.container}>
        <Box sx={tableStyles.loadingContainer}>
          <CircularProgress role="progressbar" />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={tableStyles.container} role="table">
      <Box sx={tableStyles.headerRow} role="row">
        {fieldsConfig.map((field) => (
          <Box key={field.name} sx={tableStyles.cell} role="columnheader">
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
};
