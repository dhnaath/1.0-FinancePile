import { useState } from 'react';

export function useDeletedItems(key: string) {
  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  const markDeleted = (id: string | number) => {
    const stringId = String(id);
    if (!deletedIds.includes(stringId)) {
      const newIds = [...deletedIds, stringId];
      setDeletedIds(newIds);
      localStorage.setItem(key, JSON.stringify(newIds));
    }
  };

  return { deletedIds, markDeleted };
}
