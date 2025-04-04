import { Song } from "@/types/song";

export const api = {
  songs: {
    getAll: async (): Promise<Song[]> => {
      const response = await fetch('/api/songs');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      return response.json();
    },
    getOne: async (id: string): Promise<Song> => {
      const response = await fetch(`/api/songs/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch song with id ${id}`);
      }
      return response.json();
    }
  }
};
