use wasm_bindgen::prelude::*;
use yew::prelude::*;

#[wasm_bindgen(module = "/main.js")]
extern "C" {
    async fn authenticate_user() -> JsValue;
}

#[function_component(Web3ContextProvider)]
pub fn web3_context_provider() -> Html {
    let account = use_state(|| "".to_string());
    let signature = use_state(|| "".to_string());

    let onclick = {
        let account = account.clone();
        let signature = signature.clone();
        Callback::from(move |_| {
            let account = account.clone();
            let signature = signature.clone();
            wasm_bindgen_futures::spawn_local(async move {
                match authenticate_user().await.into_serde::<(String, String)>() {
                    Ok((acc, sig)) => {
                        account.set(acc);
                        signature.set(sig);
                    },
                    Err(_) => {
                        // Handle error, e.g., show an error message
                    }
                }
            });
        })
    };

    html! {
        <>
            <button {onclick}>{"Login with Web3"}</button>
            if !(*account).is_empty() {
                <p>{format!("Account: {}", *account)}</p>
            }
            if !(*signature).is_empty() {
                <p>{format!("Signature: {}", *signature)}</p>
            }
        </>
    }
}
