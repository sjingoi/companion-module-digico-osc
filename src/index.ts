import { InstanceBase,
		 InstanceStatus,
		 SomeCompanionConfigField, 
		 runEntrypoint, 
		 CompanionActionDefinitions, 
		 OSCSomeArguments 
		} from "@companion-module/base"
import { getActions } from "./actions"
const UpgradeScripts = require('../upgrades')

export class OSCInstance extends InstanceBase<any> {
    public config: any = {}

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: any) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok);

		this.updateActions() // export actions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: any) {
		this.config = config
        this.updateActions()
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return [
			{
				type:    'static-text',
				id:      'info',
				width:   12,
				label:   'Information',
				value:   'This controls the DiGiCo console using the dealer provided OSC command set, the built in Ipad command set or S-Series commands.'
			},
			{
				type:    'textinput',
				id:      'host',
				label:   'Target IP',
				width:   6,
			},
			{
				type:    'textinput',
				id:      'port',
				label:   'Target port',
				width:   6,
				default: '8001'
			},
			{
				type:    'textinput',
				id:      'receiveport',
				label:   'Receive port',
				width:   6,
				default: '8002'
			},
			{
				type:    'dropdown',
				id:      'series',
				label:   'Command Set',
				width:   6,
				choices: [{id: "OSC", label: "OSC"}, {id: "IPAD", label: "IPAD"}, {id: "S", label: "S-Range"}],
				default: 'IPAD'
			},
			{
			type: 'checkbox',
			label: 'Poll Macros every 10 Seconds',
			id: 'polling',
			width: 5,
			default: true
		},
		]
	}

	updateActions() {
		this.setActionDefinitions(getActions(this.config))
	}

	public sendOSC(node: string, arg: OSCSomeArguments) {

		var host,port = "";
		if (this.config.host !== undefined && this.config.host !== ""){
			host = this.config.host;
		}
		if (this.config.port !== undefined && this.config.port !== ""){
			port = this.config.port;
		}
		this.oscSend(host, parseInt(port), node, arg)

	}


}

runEntrypoint(OSCInstance, UpgradeScripts)