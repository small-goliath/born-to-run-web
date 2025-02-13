import { SelectItem } from '@/types/common';
import { create } from 'zustand';

export type MarathonFilterChipInitialState = {
  locations: SelectItem[];
  courses: SelectItem[];
  setLocations: (item: SelectItem | null) => void;
  setCourses: (item: SelectItem | null) => void;
  clear: () => void;
};

const useMarathonFilterChipStore = create<MarathonFilterChipInitialState>((set) => ({
  locations: [],
  courses: [],
  setLocations: (item) =>
    set((state) => {
      if (!item) return { locations: [] };
      const exists = state.locations.some((location) => location.key === item.key);
      const newLocations = exists
        ? state.locations.filter((location) => location.key !== item.key)
        : [...state.locations, item];
      return {
        locations: newLocations,
      };
    }),
  setCourses: (item) =>
    set((state) => {
      if (!item) return { courses: [] };
      const exists = state.courses.some((course) => course.key === item.key);
      const newCourses = exists ? state.courses.filter((course) => course.key !== item.key) : [...state.courses, item];

      return {
        courses: newCourses,
      };
    }),
  clear: () =>
    set(() => {
      return {
        locations: [],
        courses: [],
        selectedLocation: null,
        selectedCourse: null,
      };
    }),
}));

export { useMarathonFilterChipStore };
