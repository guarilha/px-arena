import { Component } from "react";
import IdleTimer from 'react-idle-timer'
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";

export const AntiCheat = (props) => {
    return <AntiCheatInternal account={props.account} channel={props.channel} {...props} />;

};

class AntiCheatInternal extends Component {
    constructor(props) {
        super(props)
        this.idleTimer = null
        this.handleOnAction = this.handleOnAction.bind(this)
        this.handleOnActive = this.handleOnActive.bind(this)
        this.handleOnIdle = this.handleOnIdle.bind(this)
        this.http = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'https://furia-api.herokuapp.com/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.heartbeat = null 
    }

    async componentDidMount() {
        await this.setup()
    }

    async setup() {
        this.fp = await FingerprintJS.load({ 
            monitoring: false,
            token: process.env.FINGERPRINT_JS_TOKEN || 'GdXKPtLQuD1o3iJ4IC2a'
        })
        const { visitorId } = await this.fp.get()
        this.visitorId = visitorId
        this.heartbeat = setInterval(() => {
            if(this.idleTimer && this.idleTimer.isLeader()) { 
                this.generateEvent()
            }
        }, 10000);
        this.generateEvent('enter')
    }

    componentWillUnmount() {
        this.generateEvent('exit')
        this.heartbeat = clearInterval(this.heartbeat)
    }

    render() {
        return (
            <div>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    timeout={1000 * 60}
                    onActive={this.handleOnActive}
                    onIdle={this.handleOnIdle}
                    onAction={this.handleOnAction}
                    debounce={500}
                    crossTab={true}
                />
                {this.props.children}
            </div>
        )
    }

    handleOnAction(event) {
        this.generateEvent('action')
    }

    handleOnActive(event) {
        this.generateEvent('enter')
    }

    handleOnIdle(event) {
        this.generateEvent('exit') 
    }

    async generateEvent(type) {
        if(!this.props.account) return; 

        let data = {
            eventType: type || 'heartbeat',
            visitorId: this.visitorId,
            user: this.props.account,
            currentStream: this.props.channel,
            active: !this.idleTimer?.state.idle || false
        }

        if(type === 'enter' || type === 'exit') {
            data.activity = this.idleTimer?.state
            data.fingerprint = await this.fp.get()
        } else if(type === 'action') {
            data.activity = this.idleTimer?.state
        }
        
        this.http.post('/track', data)
    }
}

export default AntiCheat