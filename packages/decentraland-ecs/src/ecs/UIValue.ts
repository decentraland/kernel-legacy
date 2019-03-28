
/**
 * @alpha
 */
export enum UIValueType {
    PERCENT = 0,
    PIXELS = 1
}

/**
 * @alpha
 */
export class UIValue {
    value: number
    type: UIValueType

    toString(): string {
        let result: string = this.value.toString();

        if (this.type == UIValueType.PERCENT)
            result += '%'
        else
            result += 'px'

        return result
    }

    constructor(value: string | number) {
        this.type = UIValueType.PIXELS
        let valueAsString: string = value as string

        if (typeof valueAsString === "string") {
            if (valueAsString.indexOf("px") > -1) {
                this.type = UIValueType.PIXELS;
            }
            else if (valueAsString.indexOf("%") > -1) {
                this.type = UIValueType.PERCENT;
            }

            this.value = parseFloat(valueAsString);
        }
        else {
            this.value = value as number
        }
    }
}