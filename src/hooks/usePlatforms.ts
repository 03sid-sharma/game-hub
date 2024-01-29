import data from "../data/platforms";
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => ({ data: data, isLoading: false, error: null });

export default usePlatforms;
