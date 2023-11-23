use yew::prelude::*;
use crate::context_provider::Web3ContextProvider;
use yew_router::prelude::*;
use crate::pages::{Route, switch};


#[function_component(App)]
pub fn app() -> Html {
    html! {
        <>
            <Web3ContextProvider />
            <BrowserRouter>
            <Switch<Route> render={switch} />
        </BrowserRouter>
        </>
    }
}
