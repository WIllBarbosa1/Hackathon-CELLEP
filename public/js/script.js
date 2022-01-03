let url_atual = window.location.pathname

if (url_atual == "/") {
    document.querySelector("#menuHome").className = "active btn btn-secondary"
} else if (url_atual == "/posts") {
    document.querySelector("#menuPosts").className = "active btn btn-secondary"
} else if (url_atual == "/admin") {
    document.querySelector("#menuAdmin").className = "active btn btn-secondary"
}