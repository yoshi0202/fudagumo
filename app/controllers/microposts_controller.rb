class MicropostsController < ApplicationController
    require 'aws-sdk'
    include CarrierwaveBase64Uploader
    def create
        img = base64_conversion(params[:img])
        imgurl = Settings.aws[:s3_url] + Settings.aws[:s3_buclet] + "/" + params[:fileName] + '.png'
        bucket = Aws::S3::Resource.new(
                            :region => Settings.aws[:region],
                            :access_key_id => Settings.aws[:access_key],
                            :secret_access_key => Settings.aws[:secret_access_key],
                            ).bucket(Settings.aws[:s3_buclet])
        bucket.object(params[:fileName] + '.png').put(body: img, content_type: 'image/png', content_encoding: 'base64')
        Micropost.create(content: imgurl, user_id: current_user.id)
        render :json => { 'result' => imgurl}
    end

    def destroy
    end

    private
        def post_params
            params.require(:micropost).permit(:content)
        end
end
