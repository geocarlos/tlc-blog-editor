export default () => {
    class PostBody extends HTMLElement {
        constructor() {
            super();
            const content = this.innerText.replace(/<script>|<script src=".*"(\s+|)>/g, '&lt;script&gt;')
                .replace(/<\/script>/g, '&lt;/script&gt;');
            console.log(content);
            this.innerHTML = content;
        }

    }
    window.customElements.define('post-body', PostBody);
}