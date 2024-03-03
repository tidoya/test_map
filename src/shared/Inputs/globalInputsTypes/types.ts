import { InputHTMLAttributes, ReservedProps } from "vue";

export interface InputTypes extends /* @vue-ignore */ InputHTMLAttributes, ReservedProps {
    vModel?: boolean
}
