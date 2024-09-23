import { TaskUser } from "../interfaces/pages/todo";
import routes_data from '../../../../storage/app/public/datas/menu.json';
import { FavoriteRouteData } from "../interfaces/favorite-header";
import Cookies from "js-cookie";
import currencies from '../../../../storage/app/public/datas/Currencies.json'


export const TASK_USER: TaskUser = {
        id: 1,
        task_id: 1,
        user_id: 1,
        access: "",
        deleted_at: null,
        updated_at: "",
        created_at: "",
        task: {
                id: 1,
                name: "",
                description: "",
                comment: "",
                date_task: "",
                is_copy: 0,
                status: 0,
                favorite: 0,
                description_attachments: null,
                comment_attachments: null,
                deleted_definitely: 0,
                deleted_at: null,
                created_at: "",
                updated_at: "",
                labels: []
        },
        user: {
                id: 1,
                type_user_id: 2,
                companie_id: 6,
                user_name: "",
                first_name: "",
                last_name: "",
                email: "l",
                email_verified_at: "",
                avatar: "avatar\/user.png",
                twitter: null,
                instagram: null,
                facebook: null,
                linkedin: null,
                quora: null,
                google: null,
                bio: null,
                country: null,
                website: null,
                phone: null,
                birthday: null,
                status: "",
                last_active_at: "",
                deleted_at: null,
                created_at: "",
                updated_at: ""
        },
        users: [],
}

export const FAKE_TASK_USER: TaskUser = {
        "id": 1,
        "task_id": 1,
        "user_id": 1,
        "access": "1",
        "deleted_at": null,
        "updated_at": "2023-03-08T08:55:48.000000Z",
        "created_at": "2023-03-08T08:55:49.000000Z",
        "task": {
                "id": 1,
                "name": "test",
                "description": "not desctiption",
                "comment": "dsdfsd",
                "date_task": "2023-03-08",
                "is_copy": 0,
                "status": 0,
                "favorite": 0,
                "description_attachments": null,
                "comment_attachments": null,
                deleted_definitely: 0,
                "deleted_at": null,
                "created_at": "2023-03-08T08:55:12.000000Z",
                "updated_at": "2023-03-08T08:55:14.000000Z",
                "labels": [
                        {
                                "id": 1,
                                "user_id": 1,
                                "label_id": 1,
                                "task_id": 1,
                                "deleted_at": null,
                                "created_at": "2023-03-08T08:56:59.000000Z",
                                "updated_at": "2023-03-08T08:57:00.000000Z",
                                "label": {
                                        "id": 1,
                                        "user_id": 1,
                                        "name": "grey",
                                        "label": "#d1d1d1",
                                        "deleted_at": null,
                                        "created_at": "2023-03-08T05:43:17.000000Z",
                                        "updated_at": "2023-03-08T05:43:17.000000Z",
                                        "user": {
                                                "id": 1,
                                                "type_user_id": 2,
                                                "companie_id": 6,
                                                "user_name": "Camron",
                                                "first_name": "Kyra",
                                                "last_name": "Schumm",
                                                "email": "leslie81@hotmail.com",
                                                "email_verified_at": "2014-10-01T07:30:37.000000Z",
                                                "avatar": "avatar\/user-11.jpg",
                                                "twitter": null,
                                                "instagram": null,
                                                "facebook": null,
                                                "linkedin": null,
                                                "quora": null,
                                                "google": null,
                                                "bio": null,
                                                "country": null,
                                                "website": null,
                                                "phone": null,
                                                "birthday": null,
                                                "status": "active",
                                                "last_active_at": "2023-03-08 07:53:30",
                                                "deleted_at": null,
                                                "created_at": "1972-09-03T19:14:50.000000Z",
                                                "updated_at": "2023-03-08T07:53:30.000000Z"
                                        }
                                }
                        }
                ]
        },
        "user": {
                "id": 1,
                "type_user_id": 2,
                "companie_id": 6,
                "user_name": "Camron",
                "first_name": "Kyra",
                "last_name": "Schumm",
                "email": "leslie81@hotmail.com",
                "email_verified_at": "2014-10-01T07:30:37.000000Z",
                "avatar": "avatar\/user-11.jpg",
                "twitter": null,
                "instagram": null,
                "facebook": null,
                "linkedin": null,
                "quora": null,
                "google": null,
                "bio": null,
                "country": null,
                "website": null,
                "phone": null,
                "birthday": null,
                "status": "active",
                "last_active_at": "2023-03-08 07:53:30",
                "deleted_at": null,
                "created_at": "1972-09-03T19:14:50.000000Z",
                "updated_at": "2023-03-08T07:53:30.000000Z"
        },
        "users": [],
}

export const favoriteRouteData: FavoriteRouteData = routes_data

export const COOKIES = Cookies

export const CURRENCIES = currencies
