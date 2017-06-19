import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';

import TimerPage from './TimerPage/TimerPage';
import SettingsPage from './SettingsPage/SettingsPage';

export default class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'timer',
    };
  }

  selectTab(tab) {
    this.setState({ selectedTab: tab });
  }

  render() {
    return (
      <TabBarIOS styles={{ flex: 1 }}>
        <TabBarIOS.Item
          title="Timer"
          selected={this.state.selectedTab === 'timer'}
          onPress={() => this.selectTab('timer')}
        >
          <TimerPage message="timer" />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => this.selectTab('settings')}
        >
          <SettingsPage />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
