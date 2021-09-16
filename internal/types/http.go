package types

import (
	"context"
	"net/http"
)

type RouterHandler func(w http.ResponseWriter, r *http.Request) error
type MiddlewareHandler func(w http.ResponseWriter, r *http.Request) (context.Context, error)

type Router interface {
	Group(fn func(Router))
	Route(pattern string, fn func(Router))
	Get(pattern string, fn RouterHandler)
	Post(pattern string, fn RouterHandler)
	Put(pattern string, fn RouterHandler)
	Delete(pattern string, fn RouterHandler)
	With(fn MiddlewareHandler) Router
	WithBypass(fn func(next http.Handler) http.Handler) Router
	Use(fn MiddlewareHandler)
	UseBypass(fn func(next http.Handler) http.Handler)
	ServeHTTP(w http.ResponseWriter, req *http.Request)
}

type HttpManager interface {
	Start()
	Shutdown() error
}
