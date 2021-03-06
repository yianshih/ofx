import React from "react"
import LoadingManager from "./LoadingManager"
import Modal from "react-modal"
import { StyleSheet } from "../../../types"
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"
import { modalBackdropColor } from "../../constant/colors"
import View from "../../components/View"

Modal.setAppElement("#root")

export interface LoadingProps {
  /**
   * @param content Default Content to display
   */
  content: JSX.Element | null
  /**
   * @param modalProps Custom ModalProps
   */
  modalProps?: Partial<Modal.Props>
}

/**
 * @showModal Value to decide modal show or hide
 * @content Custom loading content
 * @label Custom label under content or logo
 * @modalProps Props for Modal component
 */
export interface LoadingState {
  showModal: boolean
  content?: JSX.Element | null
  label?: React.ReactNode
  modalProps?: Partial<Modal.Props> | null
}

/**
 * Function to show current modal
 * @param args Args pass to showModal function,please refs to showModal function
 * @param cb Callback function pass to showModal
 */
export function showLoading(args?: Partial<LoadingState>, cb?: () => void) {
  const ref = LoadingManager.getDefault()
  if (!!ref) {
    ;(ref as any)?.showModal(args ? args : null, cb)
  }
}

/**
 * Function to hide current modal
 * @param cb Callback function pass to showModal
 */
export function hideLoading(cb?: () => void) {
  const ref = LoadingManager.getDefault()
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

const DEFAULT_STATE: LoadingState = {
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

export default class LoadingProvider extends React.Component<
  LoadingProps,
  LoadingState
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
      LoadingManager.register(this)
    }
  }
  /**
   * Unbind this provider component to loading manager
   */
  componentWillUnmount() {
    //@ts-ignore
    if (this.props.canRegisterAsDefault) {
      LoadingManager.unregister(this)
    }
  }

  /**
   * Function to show modal
   * @param args Args to custom content,label or modal Props
   * @param cb Callback function after modal has shown
   */
  showModal(args?: Partial<LoadingState>, cb?: () => void) {
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
        /**
         * Reset modal state
         */
        setTimeout(() => {
          this.setState({
            ...DEFAULT_STATE
          })
        }, 500)
      }
    )
  }

  render() {
    const { showModal, modalProps, label, content }: LoadingState = this.state
    return (
      <Modal
        isOpen={showModal}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: styles.overlay,
          content: styles.content
        }}
        {...modalProps}
      >
        <View>
          {this.props?.content ? (
            this.props?.content
          ) : content ? (
            content
          ) : (
            <Logo
              className="spinning"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "white"
              }}
            />
          )}
          {label}
        </View>
      </Modal>
    )
  }
}

const styles: StyleSheet = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: modalBackdropColor
  },
  content: {
    display: "flex",
    position: undefined,
    alignItems: "center",
    justifyContent: "center",
    border: "0px",
    padding: "0px",
    overflow: "hidden",
    borderRadius: "10px"
  }
}
