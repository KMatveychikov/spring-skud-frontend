import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import {redirect} from "react-router-dom";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    token = '';

    constructor() {
        makeAutoObservable(this);
    }

    setToken(token: string) {
        this.token = token
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            this.setToken(response.data.token)
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (e) {

        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            this.setToken(response.data.token)
            this.setUser(response.data.user);
            this.setAuth(true);
            redirect('/employee')

        } catch (e) {

        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            this.setToken('');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {

        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${ API_URL }/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {

        } finally {
            this.setLoading(false);
        }
    }
}
