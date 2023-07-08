const checkIsNavigationSupported = () => {
    return Boolean(document.startViewTransition)
}

const fetchPage = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    const [, data] = text.match(/<body>([\s\S]*)<\/body>/i); // <==== new styles will be on <head>

    return data
    // return text
}

export const startViewTransition = () => {
    if (!checkIsNavigationSupported())
        return

    window.navigation.addEventListener("navigate", (event) => {
        const toUrl = new URL(event.destination.url);
        if (location.origin !== toUrl.origin)
            return;

        event.intercept({
            async handler() {
                const data = await fetchPage(toUrl.pathname)

                document.startViewTransition(() => {
                    // document.documentElement.innerHTML = data
                    document.getElementById('mainContent').innerHTML = data

                    document.documentElement.scrollTop = 0
                });
            },
        });
    });
}