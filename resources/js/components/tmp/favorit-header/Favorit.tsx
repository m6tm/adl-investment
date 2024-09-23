import React from "react"
import { createRoot } from "react-dom/client"
import { FavoriteProps, FavoriteRoute, FavoriteState } from "../interfaces/favorite-header";
import { v4 as uuid } from 'uuid'
import { sleep } from "../functions/tools";
import { COOKIES } from "../data/data";



class Favorite extends React.Component {

        props!: Readonly<FavoriteProps>;
        state: Readonly<FavoriteState>;

        constructor(props: Readonly<any>) {
                super(props)
                this.state = {
                        routes: Object.values(this.props.routes),
                        text_search: '',
                        visible: false,
                        favorites: [],
                }
        }

        componentDidMount(): void {
                this.favorites = JSON.parse(COOKIES.get('favorites') ?? JSON.stringify([]))
        }

        get routes() {
                return this.state.routes
        }

        set routes(routes: Array<FavoriteRoute>) {
                this.setState({ ...this.state, ...{ routes } })
        }

        get text_search() {
                return this.state.text_search
        }

        set text_search(text_search: string) {
                this.setState({ ...this.state, ...{ text_search } })
        }

        get visible() {
                return this.state.visible
        }

        set visible(visible: boolean) {
                this.setState({ ...this.state, ...{ visible } })
        }

        get favorites() {
                return this.state.favorites
        }

        set favorites(favorites: Array<string>) {
                COOKIES.set('favorites', JSON.stringify(favorites))
                this.setState({ ...this.state, ...{ favorites } })
        }

        onTextChange = async (text: string) => {
                this.text_search = text
                await sleep(200)
                this.routes = Object.values(this.props.routes).filter(route => route.name.toLowerCase().indexOf(text.toLowerCase()) !== -1)
        }

        onSetFavorite = (route: FavoriteRoute) => {
                if (this.favorites.find(route_name => route_name == route.route)) {
                        this.favorites = this.favorites.filter(route_name => route_name !== route.route)
                } else {
                        this.favorites = Array.prototype.concat(this.favorites, [route.route])
                }
        }

        render(): React.ReactNode {
                return (
                        <>
                                <ul className="nav navbar-nav bookmark-icons">
                                        {
                                                Object.values(this.props.routes).filter(route => this.favorites.indexOf(route.route) !== -1).map(route => (
                                                        <li key={uuid()} className="nav-item d-lg-block">
                                                                <a className="nav-link" href={route.link} data-toggle="tooltip" data-placement="top"
                                                                        title={route.name}>
                                                                        <i className={`ficon bx bx-${route.icon}`}></i>
                                                                </a>
                                                        </li>
                                                ))
                                        }
                                </ul>
                                <ul className="nav navbar-nav">
                                        <li className="nav-item d-lg-block">
                                                <a className="nav-link bookmark-star" id="tour_2" onClick={() => this.visible = !this.visible}>
                                                        <i className="ficon bx bx-star warning"></i>
                                                </a>
                                                <div className={`favorite-overlay${this.visible ? ' show' : ''}`} onClick={() => this.visible = false}></div>
                                                <div className={`bookmark-input search-input${this.visible ? ' show' : ''}`}>
                                                        <div className="bookmark-input-icon">
                                                                <i className="bx bx-search primary"></i>
                                                        </div>
                                                        <input className="form-control input" type="text" placeholder="Type here ..." tabIndex={0}
                                                                data-search="template-search" value={this.text_search} onChange={e => this.onTextChange(e.target.value)} />
                                                        <ul className={`search-list${this.visible ? ' show' : ''}`}>
                                                                {
                                                                        this.routes.map(route => (
                                                                                <li key={uuid()} className="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer" onClick={() => this.onSetFavorite(route)}>
                                                                                        <a className="d-flex align-items-center justify-content-between w-100" href="" onClick={e => e.preventDefault()}>
                                                                                                <div className="d-flex justify-content-start align-items-center">
                                                                                                        <i className={`ficon bx bx-${route.icon}`}></i>
                                                                                                        <span>{route.name}</span>
                                                                                                </div>
                                                                                                <span className={`float-right bookmark-icon bx bx-star ${this.favorites.indexOf(route.route) !== -1 ? 'danger' : 'warning'}`}></span>
                                                                                        </a>
                                                                                </li>
                                                                        ))
                                                                }
                                                        </ul>
                                                </div>
                                        </li>
                                </ul>
                        </>
                )
        }
}

const favorite_component = document.getElementById('navbar-mobile-cp')

if (favorite_component && favorite_component.getAttribute('data-menu')) {
        createRoot(favorite_component).render(<Favorite {...{ routes: JSON.parse(favorite_component.getAttribute('data-menu') ?? JSON.stringify({})) }} />)
}