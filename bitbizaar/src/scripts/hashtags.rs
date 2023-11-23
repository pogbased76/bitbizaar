use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Properties, PartialEq)]
pub struct HashtagProps {
    pub tag: String,
}

#[function_component(Hashtag)]
pub fn hashtag(props: &HashtagProps) -> Html {
    html! {
        <div>
            {format!("Hashtag Page for #{}", props.tag)}
        </div>
    }
}
