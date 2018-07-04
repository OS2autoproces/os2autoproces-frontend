/*
    This function sets environment configuration for application on startup
    ${API_AUTOPROCES} is replaced by startup.sh, which is run when the Docker container starts.
*/
(function() {
  function getEnvironmentVariable(variable, defaultValue) {
    var hasBeenReplaced = !variable.match(/^\$\{[A-Z_]+\}$/);

    return hasBeenReplaced ? variable : defaultValue;
  }

  window.autoProcessConfiguration = {
    apiUrl: getEnvironmentVariable(
      '${API_AUTOPROCES}',
      'https://dev.os2autoproces.eu'
    )
  };
})();
