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
    let error_message = use_state(|| "".to_string());

    let onclick = {
        let account = account.clone();
        let signature = signature.clone();
        let error_message = error_message.clone();
        Callback::from(move |_| {
            let account = account.clone();
            let signature = signature.clone();
            let error_message = error_message.clone();
            wasm_bindgen_futures::spawn_local(async move {
                match authenticate_user().await.into_serde::<Result<(String, String), String>>() {
                    Ok(Ok((acc, sig))) => {
                        account.set(acc);
                        signature.set(sig);
                    },
                    Ok(Err(e)) | Err(_) => {
                        error_message.set("Authentication failed. Please try again.".to_string());
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
            if !(*error_message).is_empty() {
                <p>{(*error_message).clone()}</p>
            }
        </>
    }
}
