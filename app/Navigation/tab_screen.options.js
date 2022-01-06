import React from 'react';

import NavInner from './NavHead/nav_inner.component';

const getValueFromOptions = (options, key, value) => {
    return typeof options[key] !== "undefined" ? options[key] : value
}

export default {
    header: ({ scene, previous, navigation 
    }) => {
      const { options } = scene.descriptor;
      const title = getValueFromOptions(options, "title", "");
      const iconTitle = getValueFromOptions(options, "iconTitle", null);
      const headerTransparent = getValueFromOptions(options, "headerTransparent", false);
      const rightIcon = getValueFromOptions(options, "rightIcon", '');
      const withBorder = getValueFromOptions(options, "withBorder", false);
      const withReturn = getValueFromOptions(options, "withReturn", false);
      const withRightIcon = getValueFromOptions(options, "withRightIcon", false);
      const withTitle = getValueFromOptions(options, "withTitle", false);
      const withMenu = getValueFromOptions(options, "withMenu", false);
      const OnShowMenu = getValueFromOptions(options, "OnShowMenu", null);
      const firstLoad = getValueFromOptions(options, "firstLoad", false)
      return (
        <NavInner
          title={title}
          iconTitle={iconTitle}
          headerTransparent={headerTransparent}
          rightIcon={rightIcon}
          withRightIcon={withRightIcon}
          withBorder={withBorder}
          withMenu={withMenu}
          withReturn={withReturn}
          withTitle={withTitle}
          firstLoad={firstLoad}
          OnBackPress={() => {
            navigation.goBack();
          }}
          OnInfoPress={() => {
            options.OnInfoPress();
          }}
          OnShowMenu={OnShowMenu}
          OnRightPress={options.OnRightPress}
        />
      );
    }
}
