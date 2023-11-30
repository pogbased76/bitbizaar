use yew_router::prelude::*;
use yew::prelude::*;
use crate::scripts::hashtags::Hashtag;
use crate::scripts::cashtags::Cashtag;


#[derive(Debug, Clone PartialEq, Routable)]
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
        Route::Hashtag { tag } => html! { <Hashtag tag={tag.clone()} /> },
        Route::Cashtag { deal } => html! { <Cashtag deal={deal.clone()} /> },
        Route::NotFound => html! { <div>{"404 Not Found"}</div> },
    }
}
