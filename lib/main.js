'use babel';

export default {
  lastPress: 0,

  config: {
    action: {
      title: 'Action',
      description: 'Command to execute',
      type: 'string',
      default: 'command-palette:toggle',
    },
    key: {
      title: 'Key',
      description: 'Hot key',
      type: 'string',
      enum: ["Control", "Shift", "Alt"],
      default: 'Control',
    },
    delay: {
      title: 'Delay',
      description: 'Maximum delay between tapping shift in miliseconds',
      type: 'integer',
      default: 500,
      minimum: 1,
    }
  },

  activate() {
    const view = atom.views.getView(atom.workspace);
    const key = atom.config.get('dtapkey.key');
    const delay = atom.config.get('dtapkey.delay');

    view.addEventListener('keydown', e => this.keyDown(e, key, delay));
  },

  keyDown(event, key, delay) {
    if ((event.key === key) && this.tapSpeed(delay)) {
      atom.commands.dispatch(event.target, atom.config.get('dtapkey.action'));
    }
  },

  tapSpeed(delay) {
    const isFast = Date.now() - this.lastPress <= delay;

    this.lastPress = isFast ? 0 : Date.now();

    return isFast;
  },
};
