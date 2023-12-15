# Tauri + Yew

This template should help get you started developing with Tauri and Yew.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).


- [] Get it to just work.
    - [] The user should be able to signin/create an account using metamask, while a basic   instance of Ublock origin is running.
    - [] The user should be able to make posts that submit to there profile and to the main feed. 
        - [] Get Yew and Nodejs should work asynchronously.
        - [] Make sure both the user instance and the main instance work asynchronously.
        - [] Make sure content that is changed/edited, is done so using there signature.
            - [] Have basic access controls/tokens/signatures as well as other forms of ddos protection.
        - [] Your main server/network, should pin the main database.
        - [] Whereas private accounts should pin there own data, not including there username and signature.
        - [] main feeds should be able to securely handle posts that are texts/code as well as images, CAD files and gifs.
        - [] the main feed will link to the users account.
    - [] handling transactions/monetization.
        - [] After the user fills out what they want to post, including the title, content and hashtags, they can click next and to make an offer. Or if they type in $ inside of the tags directory, it should prompt them to select a payment method and an escrow.
            - [] once they select an escrow, it should display a crypto address on the frontend, once a payment is submitted to it, the post is given a checkmark, on hovering over the checkmark, it should say escrowed by admin.
    - [] web2 accounts, will use a standard actix-web server and postgres database, working with orbitdb through a restapi.
- [] Build your own ipfs-cluster.
- []
- []
- []
- []


- [] Make sure to have the right encryption algorithms,
    - [] use view keys for decrypting posts, that a private profile has made for there posts.