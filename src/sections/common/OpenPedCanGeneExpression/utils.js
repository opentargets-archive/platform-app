/* 
 * This helper function will be used by sections that have their data coming from external API. 
 * It will keep track of which section to be displayed or not based on the data availability 
 * represented by the 'flag' parameter. 
 */
export const setDisplaySettingForExternal = (flag, definitionKey, displaySettingsForExternal, updateDisplaySettingsForExternal)=>{
  if (flag) {
    // HasData from external source
    if (!displaySettingsForExternal.includes(definitionKey)) {
      //If this section.difinition.id is not presented in the displaySettingsForExternal array, add id into it.
      updateDisplaySettingsForExternal([...displaySettingsForExternal, definitionKey]);
    }
  } else {
    // No data from external source
    if (displaySettingsForExternal.includes(definitionKey)) {
      //If this section.difinition.id is  presented in the displaySettingsForExternal array, remove it from displaySettingsForExternal.
      const index = displaySettingsForExternal.indexOf(definitionKey);
      displaySettingsForExternal.splice(index,1);
      updateDisplaySettingsForExternal([...displaySettingsForExternal]);
    }
  }
}
