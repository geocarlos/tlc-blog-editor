const webComponents = () => {
    class PostBody extends HTMLElement {
        connectedCallback() {
            const content = this.innerText.replace(/<script>|<script src=("|').*("|')(\s+|)>/g, '&lt;script&gt;')
            .replace(/<\/script>/g, '&lt;/script&gt;');
            this.innerHTML = content;
        }

    }
    window.customElements.define('post-body', PostBody);

    class PostBodyEdit extends HTMLElement {
        static get observedAttributes() {
            return ['body'];
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            if (name === 'body' && oldValue !== newValue) {
                const body = this.getAttribute('body');
                const content = body?.replace(/<script>|<script src=("|').*("|')(\s+|)>/g, '&lt;script&gt;')
                .replace(/<\/script>/g, '&lt;/script&gt;');
                this.innerHTML = content || '';
            }
        }

    }
    window.customElements.define('post-body-edit', PostBodyEdit);

    class TextInput extends HTMLElement {
        static get observedAttributes() {
            return ['initialValue', 'className'];
        }

        connectedCallback() {
            const value = this.getAttribute('initialValue');
            const className = this.getAttribute('className');
            if (className) {
                this.classList.add(className);
            }
            this.style.display = 'block';
            this.textContent = value;
        }

    }
    window.customElements.define('text-input', TextInput);
}

export default webComponents;