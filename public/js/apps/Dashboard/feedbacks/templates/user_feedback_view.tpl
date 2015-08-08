  <% if (approved) { %>
  <h4><b><i> Approved: </i></b></h4>
      <button class="positive ui button summary user-feedback" style=""><i class="feed icon"></i>
        You've submitted video for <%= classTitle %> by instructor <b> Jonah Chin </b> </a>.
      </button>
  <% } %>

  <% if (!approved) { %>
   <h4><b><i> Pending: </i></b></h4>
      <button class="negative ui button summary user-feedback"><i class="feed icon"></i>
        You've submitted video for <%= classTitle %> by instructor <b> Jonah Chin </b> </a>.
      </button>
  <% } %>

  