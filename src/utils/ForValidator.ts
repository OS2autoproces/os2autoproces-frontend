import Vue from "vue";

class FormValidator {

    validateChildComponents(parent: Vue) {
        const children: Vue[] = parent.$children;
        if (children.length === 0) { return }

        children.forEach((child: any) => {
            if (Array.isArray(child.$children) && child.$children.length > 0) {
                this.validateChildComponents(child);
            }
            if (typeof child.validateForm === 'function') {
                child.validateForm();
            }
        });
    }
}

const formValidator = new FormValidator();
export default formValidator;
