export interface Person {
    id: number;
    lastName: string;
    firstName: string;
    sex: string;
    birthdate: Date;
    directors: Director[];
    actors: Actor[];
    createdAt: Date;
}

export interface Director {
    id: number;
    personId: number;
    person: Person;
    movies: Movie[];
    createdAt: Date;
}

export interface Actor {
    id: number;
    personId: number;
    person: Person;
    castings: Casting[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Role {
    id: number;
    name: string;
    castings: Casting[];
    createdAt: Date;
}

export interface Genre {
    id: number;
    name: string;
    genres: GenresMovies[];
    createdAt: Date;
}

export interface Movie {
    id: number;
    title: string;
    dateRelease: Date;
    duration: number;
    synopsis: string;
    note: number;
    poster?: string;
    directorId?: number;
    director?: Director;
    genres: GenresMovies[];
    castings: Casting[];
}

export interface Casting {
    id: number;
    movieId: number;
    movie: Movie;
    actorId: number;
    actor: Actor;
    roleId: number;
    role: Role;
}

export interface GenresMovies {
    id: number;
    movieId: number;
    movie: Movie;
    genreId: number;
    genre: Genre;
}