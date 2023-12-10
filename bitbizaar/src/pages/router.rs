use yew_router::prelude::*;
use yew::prelude::*;
use crate::pages::home::Home;
use crate::pages::login::Login;
use crate::scripts::cashtags::Cashtag;
use crate::scripts::hashtags::Hashtag;

#[derive(Clone, PartialEq, Routable)]
pub enum Route {
    #[at("/")]
    Home,
    #[at("/login")]
    Login,
    #[at("/hashtag/:tag")]
    Hashtag { tag: String },
    #[at("/cashtag/:deal")]
    Cashtag { deal: String },
    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(routes: Route) -> Html {
    match routes {
        Route::Home => html! { <Home /> },
        Route::Login => html! { <Login /> },
        Route::Hashtag { tag } => html! { <Hashtag tag={tag} /> },
        Route::Cashtag { deal } => html! { <Cashtag deal={deal} /> },
        Route::NotFound => html! { <div>{"404 Not Found"}</div> },
    }
}