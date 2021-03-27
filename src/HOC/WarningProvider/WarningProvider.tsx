import React from "react"
import { Button, Modal, ModalProps } from "antd"
import WarningManager from "./WarningManager"

export interface WarningProps {
  /**
   * @param content Default Content to display
   */
  content: JSX.Element | null
  /**
   * @param modalProps Custom ModalProps
   */
  modalProps?: Partial<ModalProps>
}

/**
 * @showModal Value to decide modal show or hide
 * @content Custom loading content
 * @title Custom title on top
 * @modalProps Props for Modal component
 * @onClose Function on clicking top right close button
 * @onOK  Function on clicking OK button
 */
export interface WarningState {
  showModal: boolean
  content?: JSX.Element | null
  title?: string
  modalProps?: Partial<ModalProps> | null
  onClose?: () => void
  onOK?: () => void
}

/**
 * Function to show current modal
 * @param args Args pass to showModal function,please refs to showModal function
 * @param cb Callback function pass to showModal
 */
export function showWarning(args?: Partial<WarningState>, cb?: () => void) {
  const ref = WarningManager.getDefault()
  if (!!ref) {
    ;(ref as any)?.showModal(args ? args : null, cb)
  }
}

/**
 * Function to hide current modal
 * @param cb Callback function pass to showModal
 */
export function hideWarning(cb?: () => void) {
  const ref = WarningManager.getDefault()
  if (!!ref) {
    ;(ref as any)?.hideModal(cb)
  }
}

/**
 * Generate random id
 */
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
  WarningProps,
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

  /**
   * Bind this provider component to loading manager
   */
  componentDidMount() {
    //@ts-ignore
    if (this.props.canRegisterAsDefault) {
      WarningManager.register(this)
    }
  }

  /**
   * Unbind this provider component to loading manager
   */
  componentWillUnmount() {
    //@ts-ignore
    if (this.props.canRegisterAsDefault) {
      WarningManager.unregister(this)
    }
  }

  /**
   * Function to show modal
   * @param args Args to custom content,title, onClose,onOK or modal Props
   * @param cb Callback function after modal has shown
   */
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

  /**
   * Function to hide modal
   * @param cb Callback function after modal has hidden
   */
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
