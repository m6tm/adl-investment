

export type AdvantageState = {
    images: Array<string>
    files: Array<File>
}

export type AdvantageProps = {
    token: string
}

export type CreateAdvantageRsponse = {
        code: number
        response: {
                message: string
                errors?: any
        }
}
