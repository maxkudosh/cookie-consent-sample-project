class OperationResult {
    #isSuccessful
    #data
    #errorType

    get isSuccessful() {
        return this.#isSuccessful;
    }

    get data() {
        if (!this.#isSuccessful) {
            throw new Error('Cannot extract data from unsuccessful operation result');
        }

        return this.#data;
    }

    get errorType() {
        if (this.isSuccessful) {
            throw new Error('Cannot extract error type from successful operation result');
        }

        return this.#errorType;
    }


    constructor(isSuccessful, data, errorType) {
        this.#isSuccessful = isSuccessful;
        this.#data = data;
        this.#errorType = errorType;
    }
}

function createSuccessfulResult(data) {
    return new OperationResult(true, data, null);
}

function createFailedResult(errorType) {
    return new OperationResult(false, null, errorType);
}

export {
    createSuccessfulResult,
    createFailedResult
};
