/*
    This function sets environment configuration for application on startup
    ${API_DISCOVERY} and ${API_AUTOPROCES} are replaced by startup.sh
    which is run when the Docker container starts.
*/
(function() {
  function getEnvironmentVariable(variable, defaultValue) {
    var hasBeenReplaced = !variable.match(/^\$\{[A-Z_]+\}$/);

    return hasBeenReplaced ? variable : defaultValue;
  }

  window.autoProcessConfiguration = {
    discoveryUrl: getEnvironmentVariable(
      '${API_DISCOVERY}',
      'https://dev.os2autoproces.eu/saml/discovery?entityID=https%3A%2F%2Fdev.os2autoproces.eu%2F'
    ),
    apiUrl: getEnvironmentVariable(
      '${API_AUTOPROCES}',
      'https://dev.os2autoproces.eu/api'
    )
  };
})();
