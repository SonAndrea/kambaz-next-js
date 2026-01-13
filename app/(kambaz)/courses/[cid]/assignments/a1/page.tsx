export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <br />

      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />

      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of"
      />
      <br />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue="100" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <input id="wd-group" defaultValue="100" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <input id="wd-display-grade-as" defaultValue="100" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <input id="wd-submission-type" defaultValue="100" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <label>Online Entry Options</label>
              <br />

              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />

              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />

              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recording</label>
              <br />

              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />

              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" defaultValue="2026-01-01" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>

          <tr>
            <td>
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2026-01-01"
              />
            </td>
            <td>
              <input
                type="date"
                id="wd-available-until"
                defaultValue="2026-01-01"
              />
            </td>
          </tr>

          <tr>
            <td>
              <button type="button" id="wd-cancel-btn">
                Cancel
              </button>
            </td>
            <td>
              <button type="button" id="wd-save-btn">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
