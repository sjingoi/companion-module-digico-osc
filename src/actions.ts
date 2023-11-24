import { CompanionActionDefinitions, CompanionActionEvent, OSCMetaArgument, OSCSomeArguments } from "@companion-module/base";
import { OSCInstance } from ".";


export function getActions(osci: OSCInstance): CompanionActionDefinitions {

	let actions: CompanionActionDefinitions = {};
	let CHOICES_CHANNELS =[];
	let CHOICES_CG =[];
	let CHOICES_AUX =[];
	let CHOICES_GO =[];
	for (var i = 1; i < 145; i++) {
		CHOICES_CHANNELS.push({ label: `ch ${i}`, id: i})
	}
	for (var i = 1; i < 25; i++) {
		CHOICES_CG.push({ label: `CG ${i}`, id: i})
	}
	for (var i = 1; i < 13; i++) {
		CHOICES_AUX.push({ label: `Aux ${i}`, id: i})
	}
	for (var i = 1; i < 13; i++) {
		CHOICES_GO.push({ label: `Group Output ${i}`, id: i})
	}

    const CHOICES_FADER = [
		{ label: '+10 db', id: 1},
		{ label: '+9 db', id: 0.975},
		{ label: '+8 db', id: 0.95},
		{ label: '+7 db', id: 0.925},
		{ label: '+6 db', id: 0.9},
		{ label: '+5 db', id: 0.875},
		{ label: '+4 db', id: 0.85},
		{ label: '+3 db', id: 0.825},
		{ label: '+2 db', id: 0.8},
		{ label: '+1 db', id: 0.775},
		{ label: '0 db', id: 0.75},
		{ label: '-1 db', id: 0.725},
		{ label: '-2 db', id: 0.7},
		{ label: '-3 db', id: 0.675},
		{ label: '-4 db', id: 0.65},
		{ label: '-5 db', id: 0.625},
		{ label: '-6 db', id: 0.6},
		{ label: '-7 db', id: 0.575},
		{ label: '-8 db', id: 0.55},
		{ label: '-9 db', id: 0.525},
		{ label: '-10 db', id: 0.5},
		{ label: '-12 db', id: 0.475},
		{ label: '-14 db', id: 0.45},
		{ label: '-16 db', id: 0.425},
		{ label: '-18 db', id: 0.4},
		{ label: '-20 db', id: 0.375},
		{ label: '-22 db', id: 0.35},
		{ label: '-24 db', id: 0.325},
		{ label: '-26 db', id: 0.3},
		{ label: '-28 db', id: 0.275},
		{ label: '-30 db', id: 0.25},
		{ label: '-50 db', id: 0.125},
		{ label: 'OFF', id: 0}
	]
    const CHOICES_FADER_IPAD = [
		{ label: '+10 db', id: 10},
		{ label: '+9 db', id: 9},
		{ label: '+8 db', id: 8},
		{ label: '+7 db', id: 7},
		{ label: '+6 db', id: 6},
		{ label: '+5 db', id: 5},
		{ label: '+4 db', id: 4},
		{ label: '+3 db', id: 3},
		{ label: '+2 db', id: 2},
		{ label: '+1 db', id: 1},
		{ label: '0 db', id: 0},
		{ label: '-1 db', id: -1},
		{ label: '-2 db', id: -2},
		{ label: '-3 db', id: -3},
		{ label: '-4 db', id: -4},
		{ label: '-5 db', id: -5},
		{ label: '-6 db', id: -6},
		{ label: '-7 db', id: -7},
		{ label: '-8 db', id: -8},
		{ label: '-9 db', id: -9},
		{ label: '-10 db', id: -10},
		{ label: '-12 db', id: -12},
		{ label: '-14 db', id: -14},
		{ label: '-16 db', id: -16},
		{ label: '-18 db', id: -18},
		{ label: '-20 db', id: -20},
		{ label: '-22 db', id: -22},
		{ label: '-24 db', id: -24},
		{ label: '-26 db', id: -26},
		{ label: '-28 db', id: -28},
		{ label: '-30 db', id: -30},
		{ label: '-40 db', id: -40},
		{ label: '-50 db', id: -50},
		{ label: '-66 db', id: -66},
		{ label: 'OFF', id: -150}
	]

    if(osci.config.series == "S") {

        actions['snapshotS'] = {
            name: 'Fire snapshot S-series',
            options: [
                {
                    label: 'number',
                    type: 'number',
                    id: 'snapshot',
                    default: 1,
                    min: 0,
                    max: 9999
                }
            ],
            callback: (action_event) => { action(action_event, osci) }
        }

        actions['snapshotNextS'] = {	name: 'Fire next snapshot S-series', options: [], callback: (action_event) => { action(action_event, osci) }	}

		actions['snapshotPrevS'] = {	name: 'Fire previous snapshot S-series', options: [], callback: (action_event) => { action(action_event, osci) }	}

    } else {

        if(osci.config.series == "OSC") {
            actions['fader'] = {
			name: 'Set fader of channel',
			options: [
			{
				label: 'channel number',
				type: 'dropdown',
				id: 'channel',
				default: '1',
				choices: CHOICES_CHANNELS
			},
			{
				label: 'fader value',
				type: 'dropdown',
				id: 'fader',
				default: 0.75,
				choices: CHOICES_FADER
			}],
            callback: (action_event) => { action(action_event, osci) }
		}
        }
        else {
        actions['fader'] = {
			name: 'Set fader of channel',
			options: [
			{
				label: 'channel number',
				type: 'dropdown',
				id: 'channel',
				default: '1',
				choices: CHOICES_CHANNELS
			},
			{
				label: 'fader value',
				type: 'dropdown',
				id: 'fader',
				default: 0,
				choices: CHOICES_FADER_IPAD
			}],
            callback: (action_event) => { action(action_event, osci) }
		}
        }
        actions['mute'] = {
            name: 'Mute channel',
            options: [
            {
                label: 'channel number',
                type: 'dropdown',
                id: 'channel',
                default: 1,
                choices: CHOICES_CHANNELS
            },
            {
                label: 'mute on/off',
                type: 'dropdown',
                id: 'mute',
                default: '1',
                choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
            }],
            callback: (action_event) => { action(action_event, osci) }
        }

        actions['auxmute'] = {
			name: 'Mute Aux',
			options: [
			{
				label: 'Aux Number',
				type: 'dropdown',
				id: 'channel',
				default: 1,
				choices: CHOICES_AUX
			},
			{
				label: 'mute on/off',
				type: 'dropdown',
				id: 'auxmute',
				default: '1',
				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
			}],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['cgmute'] = {
			name: 'Mute Control Group',
			options: [
			{
				label: 'Control Group Number',
				type: 'dropdown',
				id: 'channel',
				default: 1,
				choices: CHOICES_CG
			},
			{
				label: 'mute on/off',
				type: 'dropdown',
				id: 'cgmute',
				default: '1',
				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
			}],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['gomute'] = {
			name: 'Mute Group Output',
			options: [
			{
				label: 'Group Output Number',
				type: 'dropdown',
				id: 'channel',
				default: 1,
				choices: CHOICES_GO
			},
			{
				label: 'mute on/off',
				type: 'dropdown',
				id: 'gomute',
				default: '1',
				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
			}],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['phantom'] = {
			name: 'Phantom channel',
			options: [
			{
				label: 'channel number',
				type: 'dropdown',
				id: 'channel',
				default: 1,
				choices: CHOICES_CHANNELS
			},
			{
				label: 'Phantom on/off',
				type: 'dropdown',
				id: 'phantom',
				default: '1',
				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
			}],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['solo'] = {
			name: 'Solo channel',
			options: [
			{
				label: 'channel number',
				type: 'dropdown',
				id: 'channel',
				default: 1,
				choices: CHOICES_CHANNELS
			},
			{
				label: 'Solo on/off',
				type: 'dropdown',
				id: 'solo',
				default: '1',
				choices: [{label: "on", id: "1"},{label: "off", id: "0"}]
			}],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['snapshot'] = {
			name: 'Fire snapshot',
			options: [
				{
					label: 'number',
					type: 'number',
					id: 'snapshot',
					default: 1,
					min: 0,
					max: 9999
				}
			],
            callback: (action_event) => { action(action_event, osci) }
		}

        actions['snapshotNext'] = {	name: 'Fire next snapshot', options: [], callback: (action_event) => { action(action_event, osci) } }

		actions['snapshotPrev'] = {	name: 'Fire previous snapshot', options: [], callback: (action_event) => { action(action_event, osci) } }

		actions['macros'] = {
			name: 'Macro',
			options: [
				{
					label: 'number',
					type: 'number',
					id: 'macro',
					default: 1,
					min: 1,
					max: 256
				}
			],
            callback: (action_event) => { action(action_event, osci) }
		}

    }
    // const sendOscMessage = (path: string, args: OSCSomeArguments) => {
    //     osci.log('debug', `Sending OSC ${osci.config.host}:${osci.config.port} ${path}`)
    //     osci.log('debug', `Sending Args ${JSON.stringify(args)}`)
    //     osci.oscSend(osci.config.host, osci.config.port, path, args)
    // }

    

    return actions;
}

function action(action: CompanionActionEvent, osci: OSCInstance) {
    let id = action.actionId;
    let cmd: string = "";
    let arg: OSCMetaArgument | undefined = undefined;
    let opt = action.options;

    if(osci.config.series == "IPAD") {
        switch (id){
            case 'fader':
                arg = {
                    type: "f",
                    value: opt.fader as number
                }
                cmd = `/Input_Channels/${opt.channel}/fader`;
                break;

            case 'mute':
                arg = {
                    type: "i",
                    value: parseInt(opt.mute as string) // Im not sure about this
                }
                cmd = `/Input_Channels/${opt.channel}/mute`;
                break;

            case 'phantom':
                arg = {
                    type: "f",
                    value: parseInt(opt.phantom as string)
                }
                cmd = `/Input_Channels/${opt.channel}/Channel_Input/phantom`;
                break;

            case 'solo':
                arg = {
                    type: "f",
                    value: parseInt(opt.solo as string)
                }
                cmd = `/Input_Channels/${opt.channel}/solo`
                break;

                case 'auxmute':
                    arg = {
                        type: "i",
                        value: parseInt(opt.auxmute as string)
                    }
                    cmd = `/Aux_Outputs/${opt.channel}/mute`;
                    break;

                    case 'cgmute':
                        arg = {
                            type: "f",
                            value: parseInt(opt.cgmute as string)
                        }
                        cmd = `/Control_Groups/${opt.channel}/mute`;
                        break;

                        case 'gomute':
                            arg = {
                                type: "i",
                                value: parseInt(opt.gomute as string)
                            }
                            cmd = `/Group_Outputs/${opt.channel}/mute`;
                            break;

            case 'snapshot':
                arg = {
                    type: "i",
                    value: parseInt(opt.snapshot as string)
                }
                cmd = '/Snapshots/Fire_Snapshot_number'
                break;

            case 'snapshotNext':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/Snapshots/Fire_Next_Snapshot'
                break;

            case 'snapshotPrev':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/Snapshots/Fire_Prev_Snapshot'
                break;

            case 'macros':
                arg = {
                    type: "i",
                    value: parseInt(opt.macro as string)-1,
                }
                cmd = '/Macros/Buttons/press'
                break;
        }
    } else if (osci.config.series == "OSC") {
        switch (id){
            case 'fader':
                arg = {
                    type: "f",
                    value: opt.fader as number
                }
                cmd = `/sd/Input_Channels/${opt.channel}/fader`;
                break;

            case 'mute':
                arg = {
                    type: "i",
                    value: parseInt(opt.mute as string)
                }
                cmd = `/sd/Input_Channels/${opt.channel}/mute`;
                break;

            case 'phantom':
                arg = {
                    type: "i",
                    value: parseInt(opt.phantom as string)
                }
                cmd = `/sd/Input_Channels/${opt.channel}/Channel_Input/phantom`;
                break;

            case 'solo':
                arg = {
                    type: "i",
                    value: parseInt(opt.solo as string)
                }
                cmd = `/sd/Input_Channels/${opt.channel}/solo`
                break;

                case 'auxmute':
                    arg = {
                        type: "i",
                        value: parseInt(opt.auxmute as string)
                    }
                    cmd = `/Aux_Outputs/${opt.channel}/mute`;
                    break;

                    case 'cgmute':
                        arg = {
                            type: "f",
                            value: parseInt(opt.cgmute as string)
                        }
                        cmd = `/Control_Groups/${opt.channel}/mute`;
                        break;

                        case 'gomute':
                            arg = {
                                type: "i",
                                value: parseInt(opt.gomute as string)
                            }
                            cmd = `/Group_Outputs/${opt.channel}/mute`;
                            break;

            case 'snapshot':
                arg = {
                    type: "i",
                    value: parseInt(opt.snapshot as string)
                }
                cmd = '/sd/Snapshots/Fire_Snapshot_number'
                break;

            case 'snapshotNext':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/sd/Snapshots/Fire_Next_Snapshot'
                break;

            case 'snapshotPrev':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/sd/Snapshots/Fire_Prev_Snapshot'
                break;

            case 'macros':
                arg = {
                    type: "i",
                    value: parseInt(opt.macro as string)-1,
                }
                cmd = '/sd/Macros/Buttons/press'
                break;
        }
    } else if (osci.config.series == "S") {
        switch(id) {
            case 'snapshotS':
                arg = {
                    type: "i",
                    value: parseInt(opt.snapshot as string)
                }
                cmd = `/digico/snapshots/fire`;
                break;
            case 'snapshotNextS':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/digico/snapshots/fire/next'
                break;

            case 'snapshotPrevS':
                arg = {
                    type: "i",
                    value: 0
                }
                cmd = '/digico/snapshots/fire/previous'
                break;
        }
    } else {
        cmd = '';
    }

    if (arg !== undefined) {
        osci.sendOSC(cmd, arg)
    } else {
        osci.sendOSC(cmd, [])
    }

}