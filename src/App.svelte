<script>
  import "./style.css";
  import { DatePicker } from "./main.js";
  import dayjs from "dayjs/esm";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);
</script>

<div class="demo">
  <DatePicker
    format="DD MMM YYYY"
    selected={[
      dayjs("2020-04-20T16:15:33.000Z").toDate(),
      dayjs("2020-05-20T05:23:12.000Z").toDate(),
    ]}
    range={true}
  />
</div>

<style>
  .demo {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
</style>
