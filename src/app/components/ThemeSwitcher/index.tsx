import * as React from 'react';
import * as style from './style.css';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
// @ts-ignore
import Lottie from 'lottie-react-web'
import * as themeAnimation from '../../../assets/animations/lightdark_switch.json';

export namespace ThemeSwitcher {

  export interface Props {
    switchTheme: typeof TodoActions.toggleTheme;
    theme: RootState.ThemeState;
  }
}

export class ThemeSwitcher extends React.Component<ThemeSwitcher.Props> {
    render() {
      console.log('themeAnimation', themeAnimation);

      return (
        <section className={style.normal}>
          <Lottie
            // @ts-ignore
            options={{animationData: themeAnimation.default}}
            height={100}
          />
        </section>
    );
  }
}
