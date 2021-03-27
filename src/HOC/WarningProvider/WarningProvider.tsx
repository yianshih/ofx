import React from "react"
import { Button, Modal, ModalProps } from "antd"
import WarningManager from "./WarningManager"

export interface OverlayProps {
  /**
   * @param content Overlay Content to display
   */
  content: JSX.Element | null
  /**
   * @param modalProps Custom ModalProps
   */
  modalProps?: Partial<ModalProps>
}

export interface WarningState {
  showModal: boolean
  content?: JSX.Element | null
  title?:string
  modalProps?: Partial<ModalProps> | null
  onClose?: () => void
  onOK?: () => void
}

export function showWarning(args?: Partial<WarningState>, cb?: () => void) {
  const ref = WarningManager.getDefault()
  if (!!ref) {
    ;(ref as any)?.showModal(args ? args : null, cb)
  }
}

export function hideWarning(cb?: () => void) {
  const ref = WarningManager.getDefault()
  if (!!ref) {
    ;(ref as any)?.hideModal(cb)
  }
}

function srid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return `${s4()}-${s4()}-${s4()}`
}

const DEFAULT_STATE: WarningState = {
  showModal: false,
  content: null,
  modalProps: null
}

/**
 *
 * @param content Overlay Content to display
 * @param modalProps Custom react-native-modal Props
 * @param initCloseable Initialize closeable on Modal BackdropPress
 *
 * This OverlayProvider is used for global Overlay in APP, please place it in the top of your App (App.js)
 */

export default class WanringProvider extends React.Component<
  OverlayProps,
  WarningState
> {
  static defaultProps = {
    /**
     * Use to handle if the instance can be registed as default/global instance
     */
    modalProps: null,
    content: null,
    canRegisterAsDefault: true,
    initCloseable: true
  }

  constructor(props: any) {
    super(props)
    //@ts-ignore
    if (!this._id) {
      //@ts-ignore
      this._id = srid()
    }
    this.state = {
      ...DEFAULT_STATE
    }
  }

  componentDidMount() {
    //@ts-ignore
    if (this.props.canRegisterAsDefault) {
      WarningManager.register(this)
    }
  }
  componentWillUnmount() {
    //@ts-ignore
    if (this.props.canRegisterAsDefault) {
      WarningManager.unregister(this)
    }
  }

  showModal(args?: Partial<WarningState>, cb?: () => void) {
    this.setState(
      {
        ...DEFAULT_STATE,
        ...args,
        showModal: true
      },
      () => cb && cb()
    )
  }

  hideModal(cb?: () => void) {
    this.setState(
      {
        showModal: false
      },
      () => {
        cb && cb()
        setTimeout(() => {
          this.setState({
            ...DEFAULT_STATE
          })
        }, 500)
      }
    )
  }

  render() {
    const {
      showModal,
      modalProps,
      title,
      content,
      onOK,
      onClose
    }: WarningState = this.state

    // console.log("this.props : ", this.props)

    return (
      <Modal
        title={title || "Warning"}
        visible={showModal}
        footer={[
          <Button
            key="OK"
            type="primary"
            onClick={() => (onOK ? onOK() : this.hideModal())}
          >
            OK
          </Button>
        ]}
        
        onCancel={() => (onClose ? onClose() : this.hideModal())}
        {...modalProps}
      >
        {content || this?.props?.content}
      </Modal>
    )
  }
}
