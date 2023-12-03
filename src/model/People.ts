type GenderEnum = 0 | 1 | 2 | 3;

type CommonPersonProps = {
  id: number;
  name: string;
  gender: GenderEnum;
  known_for_department: string;
  popularity: number;
  profile_path: string;
  adult: boolean;
};

export type Person = CommonPersonProps & {
  imdb_id: string;
  also_known_as: string[];
  birthday: Date | string;
  deathday: Date | string;
  place_of_birth: string;
  biography: string;
};

export type Credit = CommonPersonProps & {
  original_name: string;
  credit_id: string;
};

export type Cast = Credit & {
  character: string;
  order: number;
};

export type Crew = Credit & {
  department: string;
  job: string;
};
