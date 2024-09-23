import { isArray, isNull, isNumber, isString } from "lodash";
import { DISCUSSTION_TYPE, QUEUE_DATA_KEYS, QUEUE_KEYS, QUEUE_STATE } from "../../enums/chat";
import { in_array } from "../../functions/tools";
import { Queue } from "../../interfaces/chat";


export default class MessageAttachment {

        /**
         * According with QUEUE_KEY enum
         */
        private queue_keys = ['id', 'token', 'files', 'state', 'messageElement', 'datas'] as const
        /**
         * According with QUEUE_DATA_KEY enum
         */
        private queue_data_keys = ['discussion_id', 'user_id', 'correspondant_id', 'correspondant_list', 'message', 'category'] as const
        /**
         * Error raised
         */
        public has_error: boolean = false;
        /**
         * Error message
         */
        public error_message: string = "";

        constructor(private queue: Queue) {
                const has_error = this.checkQueue()
                if (!has_error.status) this.raiseError(has_error.error_message)
        }

        public getQueue = () => {
                return this.has_error ? null : this.queue
        }

        public checkQueue = () => {
                const thisQueueKeys = new Set(Object.keys(this.queue)),
                        thisQueueAllowedKeys = new Set(Object.values(this.queue_keys)),
                        intersection = new Set([...thisQueueAllowedKeys].filter(item => thisQueueKeys.has(item)))

                if (intersection.size !== this.queue_keys.length) return { status: false, error_message: "Queue is in invalid form !!" }
                let checklist: Array<{ status: boolean; error_message: string }> = []

                this.queue_keys.forEach((queue, key) => {
                        let status: boolean
                        switch (key) {
                                case QUEUE_KEYS.id:
                                        status = isString(this.queue[queue])
                                        checklist.push({ status, error_message: status ? "success" : "Queue id is invalid" })
                                        break;

                                case QUEUE_KEYS.token:
                                        status = isString(this.queue[queue])
                                        checklist.push({ status, error_message: status ? "success" : "Queue token is invalid" })
                                        break;

                                case QUEUE_KEYS.files:
                                        checklist.push(
                                                (() => {
                                                        let status!: boolean
                                                        if (!isArray(this.queue[queue]) || (this.queue[queue] as Array<any>).filter(item => !(item instanceof File)).length > 0) status = false
                                                        status = true
                                                        return { status, error_message: status ? "success" : "Queue files attachment is in incorrect form" }
                                                })()
                                        )
                                        break;

                                case QUEUE_KEYS.state:
                                        status = in_array(this.queue[queue], QUEUE_STATE)
                                        checklist.push({ status, error_message: status ? "success" : "Queue state is invalid" })
                                        break;

                                case QUEUE_KEYS.datas:
                                        checklist.push((() => {
                                                const thisQueueDataKeys = new Set(Object.keys(this.queue.datas)),
                                                        thisQueueDataAllowedKeys = new Set(Object.values(this.queue_data_keys)),
                                                        data_intersection = new Set([...thisQueueDataAllowedKeys].filter(item => thisQueueDataKeys.has(item)))

                                                if (data_intersection.size !== this.queue_data_keys.length) return { status: false, error_message: "Queue => datas is in invalid form !!" }
                                                let data_checklist: Array<{ status: boolean, error_message: string }> = []

                                                this.queue_data_keys.forEach((data_queue, data_key) => {
                                                        let queue_data_status!: boolean
                                                        switch (data_key) {
                                                                case QUEUE_DATA_KEYS.discussion_id:
                                                                        queue_data_status = isNumber(this.queue.datas[data_queue])
                                                                        data_checklist.push({ status: queue_data_status, error_message: queue_data_status ? "success" : "Queue => datas discussion id is invalid" })
                                                                        break;

                                                                case QUEUE_DATA_KEYS.user_id:
                                                                        queue_data_status = isNumber(this.queue.datas[data_queue])
                                                                        data_checklist.push({ status: queue_data_status, error_message: queue_data_status ? "success" : "Queue => datas user id is invalid" })
                                                                        break;

                                                                case QUEUE_DATA_KEYS.correspondant_id:
                                                                        queue_data_status = isNumber(this.queue.datas[data_queue])
                                                                        data_checklist.push({
                                                                                status: this.queue.datas.category == DISCUSSTION_TYPE.GROUPS ? true : queue_data_status,
                                                                                error_message: queue_data_status ? "success" : "Queue => datas correspondant id is invalid"
                                                                        })
                                                                        break;

                                                                case QUEUE_DATA_KEYS.correspondant_list:
                                                                        queue_data_status = this.queue.datas.correspondant_list.length > 0
                                                                        data_checklist.push({
                                                                                status: this.queue.datas.category !== DISCUSSTION_TYPE.GROUPS ? true : queue_data_status,
                                                                                error_message: queue_data_status ? "success" : "Queue => datas correspondant list is invalid"
                                                                        })
                                                                        break;

                                                                case QUEUE_DATA_KEYS.message:
                                                                        queue_data_status = isString(this.queue.datas[data_queue])
                                                                        data_checklist.push({ status: queue_data_status, error_message: queue_data_status ? "success" : "Queue => datas message is invalid" })
                                                                        break;

                                                                case QUEUE_DATA_KEYS.category:
                                                                        queue_data_status = in_array(this.queue.datas[data_queue], DISCUSSTION_TYPE)
                                                                        data_checklist.push({ status: queue_data_status, error_message: queue_data_status ? "success" : "Queue => datas category is invalid" })
                                                                        break;

                                                                default:
                                                                        data_checklist.push({ status: false, error_message: "Queue => datas is in invalid form" })
                                                                        break;
                                                        }
                                                })

                                                const status = data_checklist.filter(item => !item.status).length > 0 ? false : true
                                                return { status, error_message: status ? "success" : data_checklist.filter(item => !item.status).at(0)!.error_message }
                                        })())
                                        break;

                                case QUEUE_KEYS.messageElement:
                                        status = !isNull(this.queue[queue])
                                        checklist.push({ status, error_message: status ? "success" : "Queue messageElement is invalid" })
                                        break;

                                default:
                                        checklist.push({ status: false, error_message: "Queue is in invalid form" })
                                        break;
                        }
                })

                const status = !(checklist.filter(item => !item.status).length > 0)
                if (status) this.initializeError()
                return { status, error_message: status ? "success" : checklist.filter(item => !item.status).at(0)!.error_message }
        }

        private raiseError = (error_message: string) => {
                this.has_error = true
                this.error_message = error_message
                throw new Error(this.error_message)
        }

        private initializeError = () => {
                this.has_error = false
                this.error_message = ""
        }
}