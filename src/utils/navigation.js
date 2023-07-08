const checkIsNavigationSupported = () => {
    return Boolean(document.startViewTransition)
}

const fetchPage = async (urlPath) => {
    const response = await fetch(`/fragments${urlPath}`);
    const text = await response.text();

    return text
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