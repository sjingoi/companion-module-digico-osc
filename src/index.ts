import { InstanceBase,
		 InstanceStatus,
		 SomeCompanionConfigField, 
		 runEntrypoint, 
		 CompanionActionDefinitions, 
		 OSCSomeArguments 
		} from "@companion-module/base"
import { getActions } from "./actions"
const UpgradeScripts = require('../upgrades')

class OSCInstance extends InstanceBase<any> {
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
		const sendOscMessage = (path: string, args: OSCSomeArguments) => {
			this.log('debug', `Sending OSC ${this.config.host}:${this.config.port} ${path}`)
			this.log('debug', `Sending Args ${JSON.stringify(args)}`)
			this.oscSend(this.config.host, this.config.port, path, args)
		}

		this.setActionDefinitions(getActions())
	}

}

runEntrypoint(OSCInstance, UpgradeScripts)

// function getActions(): CompanionActionDefinitions {

// 	let actions = [];
// 	actions.length = 0;
// 	let CHOICES_CHANNELS =[];
// 	let CHOICES_CG =[];
// 	let CHOICES_AUX =[];
// 	let CHOICES_GO =[];
// 	for (var i = 1; i < 145; i++) {
// 		CHOICES_CHANNELS.push({ label: `ch ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 25; i++) {
// 		CHOICES_CG.push({ label: `CG ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 13; i++) {
// 		CHOICES_AUX.push({ label: `Aux ${i}`, id: i})
// 	}
// 	for (var i = 1; i < 13; i++) {
// 		CHOICES_GO.push({ label: `Group Output ${i}`, id: i})
// 	}

//     // actions['fader'] = {
//     //         name: 'Set Fader Level',
//     //         options: [
//     //             {
//     //                 label: 'channel number',
//     //                 type: 'dropdown',
//     //                 id: 'channel',
//     //                 default: '1',
//     //             },
//     //             {
//     //                 label: 'fader value',
//     //                 type: 'number',
//     //                 id: 'fader',
//     //                 default: 0,
//     //             }],
//     //         callback: (action) => {
//     //             this.log("info", JSON.stringify(action))
//     //         }
//     //     }

//     return {
// 		fader: {
// 			name: 'Set Fader Level',
// 			options: [
// 				{
// 					label: 'channel number',
// 					type: 'number',
// 					id: 'channel',
// 					min: 1,
// 					max: 2,
// 					default: 1,
// 				},
// 				{
// 					label: 'fader value',
// 					type: 'number',
// 					id: 'fader',
// 					min: -150,
// 					max: 10,
// 					default: 0,
// 				}],
// 			callback: (action) => {
// 			}
// 		},
// 		coolaction: {
// 			name: 'My first action',
// 			options: [],
// 			callback: (action) => {
// 				console.log('Hello World!')
// 			}
// 		}
// 	}
// }

// send_blank: {
// 	name: 'Send message without arguments',
// 	options: [
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)

// 		sendOscMessage(path, [])
// 	},
// },
// send_int: {
// 	name: 'Send integer',
// 	options: [
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 		{
// 			type: 'textinput',
// 			label: 'Value',
// 			id: 'int',
// 			default: 1,
// 			regex: Regex.SIGNED_NUMBER,
// 			useVariables: true,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)
// 		const int = await this.parseVariablesInString(event.options.int)

// 		sendOscMessage(path, [
// 			{
// 				type: 'i',
// 				value: parseInt(int),
// 			},
// 		])
// 	},
// },
// send_float: {
// 	name: 'Send float',
// 	options: [
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 		{
// 			type: 'textinput',
// 			label: 'Value',
// 			id: 'float',
// 			default: 1,
// 			regex: Regex.SIGNED_FLOAT,
// 			useVariables: true,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)
// 		const float = await this.parseVariablesInString(event.options.float)

// 		sendOscMessage(path, [
// 			{
// 				type: 'f',
// 				value: parseFloat(float),
// 			},
// 		])
// 	},
// },
// send_string: {
// 	name: 'Send string',
// 	options: [
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 		{
// 			type: 'textinput',
// 			label: 'Value',
// 			id: 'string',
// 			default: 'text',
// 			useVariables: true,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)
// 		const string = await this.parseVariablesInString(event.options.string)

// 		sendOscMessage(path, [
// 			{
// 				type: 's',
// 				value: '' + string,
// 			},
// 		])
// 	},
// },
// send_multiple: {
// 	name: 'Send message with multiple arguments',
// 	options: [
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 		{
// 			type: 'textinput',
// 			label: 'Arguments',
// 			id: 'arguments',
// 			default: '1 "test" 2.5',
// 			useVariables: true,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)
// 		const argsStr = await this.parseVariablesInString(event.options.arguments)

// 		const rawArgs = (argsStr + '').replace(/“/g, '"').replace(/”/g, '"').split(' ')

// 		if (rawArgs.length) {
// 			const args = []
// 			for (let i = 0; i < rawArgs.length; i++) {
// 				if (rawArgs[i].length == 0) continue
// 				if (isNaN(rawArgs[i])) {
// 					let str = rawArgs[i]
// 					if (str.startsWith('"')) {
// 						//a quoted string..
// 						while (!rawArgs[i].endsWith('"')) {
// 							i++
// 							str += ' ' + rawArgs[i]
// 						}
// 					} else if(str.startsWith('{')) {
// 						//Probably a JSON object
// 						try {
// 							args.push((JSON.parse(rawArgs[i])))
// 						} catch (error) {
// 							this.log('error', `not a JSON object ${rawArgs[i]}`)
// 						}
// 					}

// 					args.push({
// 						type: 's',
// 						value: str.replace(/"/g, '').replace(/'/g, ''),
// 					})
// 				} else if (rawArgs[i].indexOf('.') > -1) {
// 					args.push({
// 						type: 'f',
// 						value: parseFloat(rawArgs[i]),
// 					})
// 				} else {
// 					args.push({
// 						type: 'i',
// 						value: parseInt(rawArgs[i]),
// 					})
// 				}
// 			}

// 			sendOscMessage(path, args)
// 		}
// 	},
// },
// send_boolean: {
// 	name: 'Send boolean',
// 	options: [
// 		{
// 			type: 'static-text',
// 			label: 'Attention',
// 			value: 'The boolean type is non-standard and may only work with some receivers.',
// 			id: 'warning'
// 		},
// 		{
// 			type: 'textinput',
// 			label: 'OSC Path',
// 			id: 'path',
// 			default: '/osc/path',
// 			useVariables: true,
// 		},
// 		{
// 			type: 'checkbox',
// 			label: 'Value',
// 			id: 'value',
// 			default: false,
// 		},
// 	],
// 	callback: async (event) => {
// 		const path = await this.parseVariablesInString(event.options.path)
// 		let type = 'F'
// 		if (event.options.value === true) {
// 			type = 'T'
// 		}

// 		sendOscMessage(path, [
// 			{
// 				type,
// 			},
// 		])
// 	},
// },