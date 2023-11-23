use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Properties, PartialEq)]
pub struct CashtagProps {
    pub deal: String,
}

#[function_component(Cashtag)]
pub fn cashtag(props: &CashtagProps) -> Html {
    html! {
        <div>
            {format!("Cashtag Page for ${}", props.deal)}
        </div>
    }
}
