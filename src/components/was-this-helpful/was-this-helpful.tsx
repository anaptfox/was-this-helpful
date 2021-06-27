import { State, Event, EventEmitter, Prop, Component, Fragment, h } from '@stencil/core';
import { ThumbsUp, ThumbsDown, EmojiHappy, EmojiSad } from './icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  tag: 'was-this-helpful',
  styleUrl: 'was-this-helpful.css',
  shadow: true,
})
export class WasThisHelpful {
  @Event() everything: EventEmitter<any>;
  @Event() response: EventEmitter<any>;
  @Event() feedback: EventEmitter<any>;
  @Event() additionalFeedback: EventEmitter<any>;

  // none: start -> done
  // form: start -> form -> done
  // options: start -> options -> done
  // other: start -> options -> form -> done
  @State() state: string = 'start';
  @State() submittedResponse: string = null;
  @State() optionRadioValue: string;
  @State() formTextAreaValue: string;

  @Prop() question: string = 'Was this helpful?';
  @Prop() iconStyle: string = 'thumbs';
  @Prop() doneText: string = '🎉 Thank you for your feedback!';
  @Prop() feedbackQuestion: string = 'What is the reason for your feedback?';
  @Prop() happyFeedback: string = 'Easy to understand, Solved my problem';
  @Prop() sadFeedback: string = 'Hard to understand, Incorrect information or sample code, Missing the information/samples I need';
  @Prop() feedbackStyle: string = 'none';
  @Prop() session: string = uuidv4();

  emitEvent(emitter: EventEmitter, event: any) {
    emitter.emit(event);
    this.everything.emit(event);
  }

  buildEvent(eventName: string, eventData: any) {
    return {
      time: Date.now(),
      session: this.session,
      event: eventName,
      data: eventData,
      location: {
        href: window.location.href,
        path: window.location.pathname,
        hostname: window.location.hostname,
      },
    };
  }

  nextState(currentState: string) {
    switch (currentState) {
      case 'start':
        if (this.feedbackStyle === 'none') {
          return 'done';
        } else if (this.feedbackStyle === 'form') {
          return 'form';
        } else if (this.feedbackStyle === 'options' || this.feedbackStyle === 'other') {
          return 'options';
        }
      case 'form':
        return 'done';
      case 'options':
        if (this.feedbackStyle === 'options') {
          return 'done';
        } else if (this.feedbackStyle === 'other' && this.optionRadioValue === "Other") {
          return 'form';
        } else {
          return 'done';
        }
      case 'done':
        return 'done';
      default:
        throw Error(`was-this-helpful: Looks like you got caught in a weird state ${currentState}.`);
    }
  }

  onSubmit(response: string) {
    return (event: Event) => {
      event.preventDefault();
      this.emitEvent(this.response, this.buildEvent('submit', response));
      this.state = this.nextState(this.state);
      this.submittedResponse = response;
    };
  }

  onOptions() {
    return (event: Event) => {
      event.preventDefault();
      this.emitEvent(this.response, this.buildEvent('feedback', this.optionRadioValue));
      this.state = this.nextState(this.state);
    };
  }

  onAdditionalFeedback() {
    return (event: Event) => {
      event.preventDefault();
      this.emitEvent(this.response, this.buildEvent('additional-feedback', this.formTextAreaValue));
      this.state = this.nextState(this.state);
    };
  }

  renderIcons(type) {
    switch (type) {
      case 'emoji':
        return (
          <div class="wth-option-container">
            <button onClick={this.onSubmit('positive')} aria-label="Emoji Happy" name="option" value="emoji-happy" class="wth-option" innerHTML={EmojiHappy} />
            <button onClick={this.onSubmit('negative')} aria-label="Emoji Sad" name="option" value="emoji-sad" class="wth-option" innerHTML={EmojiSad} />
          </div>
        );
      case 'thumbs':
        return (
          <div class="wth-option-container">
            <button onClick={this.onSubmit('positive')} aria-label="Thumbs Up" name="option" value="thumbs-up" class="wth-option" innerHTML={ThumbsUp} />
            <button onClick={this.onSubmit('negative')} aria-label="Thumbs Down" name="option" value="thumbs-down" class="wth-option" innerHTML={ThumbsDown} />
          </div>
        );

      default:
        throw Error(`was-this-helpful: ${type} is not a valid value for the icon-style attribute.`);
    }
  }

  handleTextAreaChange(event) {
    this.formTextAreaValue = event.target.value;
  }

  handleOptionChange(words) {
    return () => {
      this.optionRadioValue = words;
    };
  }

  renderOptions() {
    if (!this.submittedResponse) throw Error(`was-this-helpful: A response wasn't trackd. `);

    let feedbackOptions;
    if (this.submittedResponse === 'positive') {
      feedbackOptions = this.happyFeedback;
    } else if (this.submittedResponse === 'negative') {
      feedbackOptions = this.sadFeedback;
    }

    const options = feedbackOptions.split(',').map(sentence => {
      return (
        <div class="wth-radio">
          <input onChange={this.handleOptionChange(sentence)} id={sentence} name="feedback-form" type="radio" class="wth-radio-input" />
          <label htmlFor={sentence} style={{ marginLeft: '.5rem' }}>
            {sentence}
          </label>
        </div>
      );
    });

    if (this.feedbackStyle === 'other') {
      options.push(
        <div class="wth-radio">
          <input onChange={this.handleOptionChange('Other')} required id="other-option" name="feedback-form" type="radio" class="wth-radio-input" />
          <label htmlFor="other-option" style={{ marginLeft: '.5rem' }}>
            Other
          </label>
        </div>,
      );
    }

    return options;
  }

  renderForm(currentState: string) {
    switch (currentState) {
      case 'start':
        return (
          <Fragment>
            <h5 class="wth-title">{this.question}</h5>
            {this.renderIcons(this.iconStyle)}
          </Fragment>
        );
      case 'done':
        return <p id="wth-done-text">{this.doneText}</p>;
      case 'form':
        return (
          <form onSubmit={this.onAdditionalFeedback()} class="wth-container">
            <h4 class="wth-title">{this.feedbackQuestion}</h4>
            <textarea onInput={e => this.handleTextAreaChange(e)} required id="feedback" name="feedback" rows={3} class="wth-feedback-textarea"></textarea>
            <button style={{ width: '100%' }} type="submit" value="Submit" class="wth-button">
              Submit
            </button>
          </form>
        );
      case 'options':
        return (
          <form onSubmit={this.onOptions()} class="wth-container">
            <h4 style={{ marginBottom: '1rem' }} class="wth-title">
              {this.feedbackQuestion}
            </h4>

            <fieldset class="wth-fieldset">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,minmax(0,1fr))', rowGap: '.5em' }}>{this.renderOptions()}</div>
            </fieldset>

            <button style={{ width: '100%' }} type="submit" value="Submit" class="wth-button">
              Submit
            </button>
          </form>
        );
      default:
        throw Error(`was-this-helpful: Looks like you got caught in a weird state ${currentState}.`);
    }
  }

  render() {
    return <div class="was-this-helpful-container">{this.renderForm(this.state)}</div>;
  }
}
