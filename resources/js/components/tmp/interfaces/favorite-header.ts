


export interface FavoriteProps {
        routes: FavoriteRouteData
}

export interface FavoriteState {
        routes: Array<FavoriteRoute>
        text_search: string
        visible: boolean
        favorites: Array<string>
}

export interface FavoriteRouteData {
        [route_name: string]: FavoriteRoute
}

export interface FavoriteRoute {
        route: string
        link?: string
        name: string
        icon: string
}