import  * as actionTypes from '../actions/actionTypes'
import reducer from './auth'

describe("auth reducer test", () => {
    it('should return the initial taste', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
    it('should return token', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'}
        , {type: actionTypes.AUTH_SUCCESS,
            idToken: 221212121,
            userId: 2121212213242})).toEqual({
            token: 221212121,
            userId: 2121212213242,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
    it('should return loading true after authentication started', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'}
        , {type: actionTypes.AUTH_START,})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: '/'
        })
    });
})